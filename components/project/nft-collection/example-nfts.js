const range = (n) => Array.from({ length: n }, (_, i) => i)

export default {
    1: [
        {
            id: '#79',
            url: 'https://2glp2-eqaaa-aaaak-aajoa-cai.raw.ic0.app/?asset=79',
        },
        {
            id: '#160',
            url: 'https://2glp2-eqaaa-aaaak-aajoa-cai.raw.ic0.app/?asset=160',
        },
        {
            id: '#226',
            url: 'https://2glp2-eqaaa-aaaak-aajoa-cai.raw.ic0.app/?asset=226',
        },
    ],
    4: [
        {
            id: '#0',
            url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=41',
        },
        {
            id: '#1',
            url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=42',
        },
        {
            id: '#2',
            url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=43',
        },
    ],
    6: [
        {
            id: '#1',
            url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=27',
        },
        {
            id: '#2',
            url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=28',
        },
        {
            id: '#3',
            url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=29',
        },
    ],
    7: [
        {
            id: '#0',
            url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=37',
        },
        {
            id: '#1',
            url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=39',
        },
        {
            id: '#2',
            url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=38',
        },
    ],
    8: range(3).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/music-video/${i + 1}.png`,
    })),
    9: range(3).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/icwhiskers/${i + 1}.png`,
    })),
    11: range(3).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/thanat0s/${i + 1}.jpg`,
    })),
    13: range(3).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/ic-cutemon/${i + 1}.png`,
    })),
    15: range(6).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/frontliners/${i + 1}.png`,
    })),
    16: range(6).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/sa-chan/${i + 1}.jpg`,
    })),
    17: range(4).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/chinese-characters/${i}.png`,
    })),
    18: range(3).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/kyle/${i}.png`,
    })),
    19: range(3).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/naaps/naaps-crowdfundnft_${i + 1}.png`,
    })),
    20: range(3).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/operahuadan/${i}.jpg`,
    })),
    21: range(3).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/kinic/${i}.png`,
    })),
    24: range(3).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/ic-footprint/0.png`,
    })),
    26: range(3).map((i) => ({
        id: `#${i}`,
        url: `/assets/nfts/icapps/1.jpg`,
    })),
}
