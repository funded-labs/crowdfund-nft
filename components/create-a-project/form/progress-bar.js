import classNames from 'classnames'

export default function ProgressBar({ step }) {
  return (
    <div className='grid w-full grid-cols-8 gap-x-2'>
      <div className={classNames('h-1 w-full bg-blue-600 ')} />
      <div
        className={classNames(
          'h-1 w-full w-full',
          step > 1 ? 'bg-blue-600' : 'bg-neutral-300',
        )}
      />
      <div
        className={classNames(
          'h-1 w-full w-full',
          step > 2 ? 'bg-blue-600' : 'bg-neutral-300',
        )}
      />
      <div
        className={classNames(
          'h-1 w-full w-full',
          step > 3 ? 'bg-blue-600' : 'bg-neutral-300',
        )}
      />
      <div
        className={classNames(
          'h-1 w-full w-full',
          step > 4 ? 'bg-blue-600' : 'bg-neutral-300',
        )}
      />
      <div
        className={classNames(
          'h-1 w-full w-full',
          step > 5 ? 'bg-blue-600' : 'bg-neutral-300',
        )}
      />
      <div
        className={classNames(
          'h-1 w-full w-full',
          step > 6 ? 'bg-blue-600' : 'bg-neutral-300',
        )}
      />
      <div
        className={classNames(
          'h-1 w-full w-full',
          step > 7 ? 'bg-blue-600' : 'bg-neutral-300',
        )}
      />
    </div>
  )
}
