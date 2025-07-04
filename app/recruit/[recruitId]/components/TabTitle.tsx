import clsx from "clsx";

interface Tab {
  key: string;
  label: string;
}

interface TabTitleProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const TabTitle = ({ tabs, activeTab, onTabChange }: TabTitleProps) => {
  return (
    <div className="relative flex w-full border-border-primary bg-background-primary">
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className="relative flex w-full items-center justify-center py-[10px]"
          >
            <span
              className={clsx(
                "text-body-2",
                isActive ? "text-sky-500" : "text-neutral-200",
              )}
            >
              {tab.label}
            </span>
            <div
              className={clsx(
                "absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300",
                isActive ? "bg-sky-500" : "bg-border-primary",
              )}
            ></div>
          </button>
        );
      })}
    </div>
  );
};

export default TabTitle;
