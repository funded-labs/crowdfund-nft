import { useRef, useEffect, useState, cloneElement } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

export default function Modal({ children, selector = "#modal", onClose = () => {}, show = false, width = "100%", height = "100%", size = "md", allowDismiss = false }) {

    useEffect(() => {
        if (show === false) return;
        document.body.classList.add("overflow-hidden");

        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [show]);

    return (
        show && (
            <Portal selector={selector}>
                <div
                    className={classNames(
                        "w-screen h-full max-h-screen fixed top-0 left-0 overflow-hidden z-40"
                    )}
                >
                    <div className="w-full h-full relative flex justify-center items-center z-20">
                        <div
                            className={classNames(
                                "w-full h-full absolute top-0 left-0 bg-opacity-90",
                                `bg-gray-900`
                            )}
                            onClick={allowDismiss ? onClose : () => {}}
                        />
                        <div
                            className={classNames(
                                "bg-white shadow-lg rounded-sm overflow-hidden flex flex-col relative w-full h-full",
                                size === "xs" ? "lg:w-3/12 lg:h-2/6" : null,
                                size === "sm" ? "lg:w-6/12 lg:h-4/6" : null,
                                size === "md" ? "lg:w-8/12 lg:h-5/6" : null,
                                size === "lg" ? "lg:w-11/12 lg:h-5/6" : null,
                                size === "xl" ? "lg:w-12/12 lg:h-6/6" : null,
                            )}
                            style={{ width: size ? null :  width, height: size ? null : height }}
                        >
                            {cloneElement(children, { onClose })}
                        </div>
                    </div>
                </div>
            </Portal>
        )
    );
}

function Portal({ children, selector }) {
    const ref = useRef()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        ref.current = document.querySelector(selector);
        setMounted(true)
    }, [selector])

    return mounted ? createPortal(children, ref.current) : null
}