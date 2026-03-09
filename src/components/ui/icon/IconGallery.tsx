import React from "react";
import { Icon, ICONS, type IconName } from "./index";
import styles from "./IconGallery.module.css";

/**
 * 利用可能なアイコン一覧
 * @see https://react-icons.github.io/react-icons/icons/fa6/
 */
export const IconGallery: React.FC = () => {
  // ICONSの全キーを取得
  const iconNames = Object.keys(ICONS) as IconName[];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Project Icon Gallery (Font Awesome 6)</h2>

      <div className={styles.grid}>
        {iconNames.map((name) => (
          <div key={name} className={styles.card}>
            <div className={styles.iconContainer}>
              <Icon name={name} size={32} />
            </div>
            <code className={styles.codeName}>{name}</code>
          </div>
        ))}
      </div>
    </div>
  );
};
