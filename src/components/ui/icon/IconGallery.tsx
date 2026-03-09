import React from "react";
import { Icon, ICONS, type IconName } from "./index";

/**
 * 利用可能なアイコン一覧
 * @see https://react-icons.github.io/react-icons/icons/fa6/
 */
export const IconGallery: React.FC = () => {
  // ICONSの全キーを取得
  const iconNames = Object.keys(ICONS) as IconName[];

  return (
    <div className="p-6 text-slate-900">
      <h2 className="mb-5 text-2xl font-bold">Project Icon Gallery (Font Awesome 6)</h2>

      <div className="grid grid-cols-5 gap-4 auto-fill">
        {iconNames.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="mb-3 text-gray-700">
              <Icon name={name} size={32} />
            </div>
            <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">{name}</code>
          </div>
        ))}
      </div>
    </div>
  );
};
