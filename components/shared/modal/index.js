import { useRef, useEffect, useState, cloneElement } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'

export default function Modal({
  children,
  selector = '#modal',
  onClose = () => {},
  show = false,
  width = '100%',
  height = '100%',
  size = 'md',
  allowDismiss = false,
  transparent = false,
}) {
  useEffect(() => {
    if (show === false) return
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [show])

  return (
    show && (
      <Portal selector={selector}>
        <div
          className={classNames(
            'fixed top-0 left-0 z-40 h-full max-h-screen w-screen overflow-hidden',
          )}
        >
          <div className='relative z-20 flex h-full w-full items-center justify-center'>
            <div
              className={classNames(
                'absolute top-0 left-0 h-full w-full',
                transparent
                  ? 'bg-blue-200 bg-opacity-60'
                  : `bg-opacity-90 bg-gradient-to-t from-blue-200 to-white`,
              )}
              onClick={allowDismiss ? onClose : () => {}}
            />
            <div
              className={classNames(
                'bg-clear  relative flex h-full w-full flex-col overflow-hidden',
                size === 'xs' ? 'lg:h-2/6 lg:w-3/12' : null,
                size === 'sm' ? 'lg:h-4/6 lg:w-6/12' : null,
                size === 'md' ? 'lg:h-5/6 lg:w-8/12' : null,
                size === 'lg' ? 'lg:h-5/6 lg:w-11/12' : null,
                size === 'xl' ? 'lg:w-12/12 lg:h-6/6' : null,
                size === 'sn' ? 'lg:h-3/6 lg:w-3/12' : null,
                size === 'static' ? 'h-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3' : null,
              )}
              style={{
                width: size ? null : width,
                height: size ? null : height,
              }}
            >
              {cloneElement(children, { onClose })}
            </div>
          </div>
        </div>
      </Portal>
    )
  )
}

function Portal({ children, selector }) {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current) : null
}
