import {
  useRef,
  useEffect,
  useCallback,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import s from '../../styles/ui/Modal.module.scss';
import { X } from 'react-feather';
import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  enableBodyScroll,
} from 'body-scroll-lock';
import { IModalProps } from '../../interfaces/ui';

const Modal: FunctionComponent<IModalProps> = ({
  children,
  onClose,
}): JSX.Element => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (ref.current) {
      disableBodyScroll(ref.current, { reserveScrollBarGap: true });
      window.addEventListener('keydown', handleKey);
    }
    return () => {
      if (ref && ref.current) {
        enableBodyScroll(ref.current);
      }
      clearAllBodyScrollLocks();
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  return (
    <div className={s.root}>
      <div className={s.modal} role="dialog" ref={ref}>
        <button
          onClick={() => onClose()}
          aria-label="Close panel"
          className={s.close}
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
