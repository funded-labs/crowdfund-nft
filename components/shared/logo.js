export default function Logo({ width }) {
    return (
        <div className='w-25 h-8 hover:scale-105 duration-200 cursor-pointer'>
            <svg
                width={width}
                viewBox='0 0 1000 168'
                xmlns='http://www.w3.org/2000/svg'>
                <g fill='none' fillRule='evenodd'>
                    <circle fill='#2757E8' cx='70.5' cy='74.5' r='62.5' />
                    <rect
                        fill='#2757E8'
                        transform='rotate(44 110.748 31.474)'
                        x='86.748'
                        y='-1.526'
                        width='48'
                        height='66'
                        rx='24'
                    />
                    <rect
                        fill='#2757E8'
                        transform='rotate(44 38.157 113.412)'
                        x='14.157'
                        y='71.912'
                        width='48'
                        height='83'
                        rx='24'
                    />
                    <rect
                        fill='#2757E8'
                        transform='rotate(44 106.57 115.927)'
                        x='68.07'
                        y='91.927'
                        width='77'
                        height='48'
                        rx='24'
                    />
                    <rect
                        fill='#2757E8'
                        transform='rotate(44 36.43 35.073)'
                        x='-2.07'
                        y='11.073'
                        width='77'
                        height='48'
                        rx='24'
                    />
                    <circle fill='#000' opacity='.711' cx='26' cy='24' r='10' />
                    <circle fill='#000' opacity='.71' cx='26' cy='126' r='10' />
                    <circle
                        fill='#FFF'
                        opacity='.707'
                        cx='116'
                        cy='24'
                        r='10'
                    />
                    <circle
                        fill='#FFF'
                        opacity='.707'
                        cx='116'
                        cy='126'
                        r='10'
                    />
                    <text
                        fontFamily='Poppins-Bold, Poppins'
                        fontSize='86'
                        fontWeight='bold'
                        letterSpacing='2.31'
                        fill='#FFF'>
                        <tspan x='37.079' y='104'>
                            C
                        </tspan>
                    </text>
                    <text
                        fontFamily='Poppins-Bold, Poppins'
                        fontSize='86'
                        fontWeight='bold'
                        letterSpacing='2.31'
                        fill='#000'>
                        <tspan x='189.919' y='104'>
                            CrowdFund NFT
                        </tspan>
                    </text>
                </g>
            </svg>
        </div>
    )
}
