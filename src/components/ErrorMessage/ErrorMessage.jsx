import css from './ErrorMessage.module.css'
import { FaRegFaceFrown } from 'react-icons/fa6';

export default function ErrorMessage() {
  return (
    <div>
      <p className={css.error}>
        Something went wrong! Please, reload the page!
        <br />
        <FaRegFaceFrown className={css.errorIcon} />
      </p>
    </div>
  );
}
