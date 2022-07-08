import Array        "mo:base/Array";
import Blob         "mo:base/Blob";
import Debug        "mo:base/Debug";
import Iter         "mo:base/Iter";
import Nat          "mo:base/Nat";
import Option       "mo:base/Option";
import Principal    "mo:base/Principal";
import Text         "mo:base/Text";

actor Images { 

    private stable var _assets : [Asset] = [];

    type File = {
        ctype : Text;//"image/jpeg"
        data : [Blob];
    };
    type Asset = {
        name : Text;
        payload : File;
    };

    public shared(msg) func addAsset(asset : Asset) : async Nat {
        Debug.print(Principal.toText(msg.caller));
        _assets := Array.append(_assets, [asset]);
        _assets.size() - 1;
    };

    public shared(msg) func streamAsset(id : Nat, payload : Blob) : async () {
        var tassets : [var Asset]  = Array.thaw<Asset>(_assets);
        var asset : Asset = tassets[id];
        asset := {
            name = asset.name;
            payload = {
                ctype = asset.payload.ctype;
                data = Array.append(asset.payload.data, [payload]);
            };
        };
        tassets[id] := asset;
        _assets := Array.freeze(tassets);
    };

    // http

    type HeaderField = (Text, Text);
    type HttpResponse = {
        status_code: Nat16;
        headers: [HeaderField];
        body: Blob;
        streaming_strategy: ?HttpStreamingStrategy;
    };
    type HttpRequest = {
        method : Text;
        url : Text;
        headers : [HeaderField];
        body : Blob;
    };
    type HttpStreamingCallbackToken =  {
        content_encoding: Text;
        index: Nat;
        key: Text;
        sha256: ?Blob;
    };
    type HttpStreamingStrategy = {
        #Callback: {
            callback: query (HttpStreamingCallbackToken) -> async (HttpStreamingCallbackResponse);
            token: HttpStreamingCallbackToken;
        };
    };
    type HttpStreamingCallbackResponse = {
        body: Blob;
        token: ?HttpStreamingCallbackToken;
    };
    let NOT_FOUND : HttpResponse = {status_code = 404; headers = []; body = Blob.fromArray([]); streaming_strategy = null};
    
    public query func http_request(request : HttpRequest) : async HttpResponse {
        let path = Iter.toArray(Text.tokens(request.url, #text("/")));
        switch(_getParam(request.url, "id")) {
            case (?idText) {
                switch (_getAssetId(idText)) {
                    case (?id) {
                        let asset : Asset = _assets[id];
                        return _processFile(Nat.toText(id), asset.payload);
                    };
                    case _ { return NOT_FOUND; };
                };
            };
            case _ { };
        };

        return {
            status_code = 200;
            headers = [("content-type", "text/plain")];
            body = Text.encodeUtf8("Number of images: " # Nat.toText(_assets.size()));
            streaming_strategy = null;
        };
    };

    public query func http_request_streaming_callback(token : HttpStreamingCallbackToken) : async HttpStreamingCallbackResponse {
        switch(_getAssetId(token.key)) {
            case null return {body = Blob.fromArray([]); token = null};
            case (?assetid) {
                let asset : Asset = _assets[assetid];
                let res = _streamContent(token.key, token.index, asset.payload.data);
                return {
                    body = res.0;
                    token = res.1;
                };
            };
        };
    };

    func _getAssetId(t : Text) : ?Nat {
        var n : Nat = 0;
        while (n < _assets.size()) {
            if (t == Nat.toText(n)) { return ?n; } else { n += 1; };
        };
        return null;
    };

    func _getParam(url : Text, param : Text) : ?Text {
        var _s : Text = url;
        Iter.iterate<Text>(Text.split(_s, #text("/")), func(x, _i) {
            _s := x;
        });
        Iter.iterate<Text>(Text.split(_s, #text("?")), func(x, _i) {
            if (_i == 1) _s := x;
        });
        var t : ?Text = null;
        var found : Bool = false;
        Iter.iterate<Text>(Text.split(_s, #text("&")), func(x, _i) {
            if (found == false) {
                Iter.iterate<Text>(Text.split(x, #text("=")), func(y, _ii) {
                    if (_ii == 0) {
                        if (Text.equal(y, param)) found := true;
                    } else if (found == true) t := ?y;
                });
            };
        });
        return t;
    };

    private func _processFile(id : Text, file : File) : HttpResponse {
        if (file.data.size() > 1 ) {
            let (payload, token) = _streamContent(id, 0, file.data);
            return {
                status_code = 200;
                headers = [("Content-Type", file.ctype), ("cache-control", "public, max-age=15552000")];
                body = payload;
                streaming_strategy = ?#Callback({
                token = Option.unwrap(token);
                callback = http_request_streaming_callback;
                });
            };
        } else {
            return {
                status_code = 200;
                headers = [("content-type", file.ctype), ("cache-control", "public, max-age=15552000")];
                body = file.data[0];
                streaming_strategy = null;
            };
        };
    };

    private func _streamContent(id : Text, idx : Nat, data : [Blob]) : (Blob, ?HttpStreamingCallbackToken) {
        let payload = data[idx];
        let size = data.size();

        if (idx + 1 == size) {
            return (payload, null);
        };

        return (payload, ?{
            content_encoding = "gzip";
            index = idx + 1;
            sha256 = null;
            key = id;
        });
    };

}