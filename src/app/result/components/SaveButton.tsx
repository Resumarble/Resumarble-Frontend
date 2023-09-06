import { downloadAsTxt } from "../utils/download";
import styles from "./saveButton.module.css";
import { FiSave } from "react-icons/fi";

export default function SaveButton({ txt }: { txt: string }) {
  return (
    <div className={styles.container} onClick={() => downloadAsTxt(txt)}>
      <FiSave size={23} />
    </div>
  );
}
