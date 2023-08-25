import Image from "next/image";
import React from "react";
import bg from "public/bg.png";
import styles from "./bg.module.css";

export default function Background() {
  return <Image className={styles.bg} quality={100} alt="bg" src={bg}></Image>;
}
