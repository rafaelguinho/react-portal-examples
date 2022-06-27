import React, { useEffect } from "react";
import debounce from "lodash/debounce";

export type TooltipPopoverProps = {
  coords: any;
  updateTooltipCoords: (button: any) => void;
};

const TooltipPopover = ({
  children,
  coords,
  updateTooltipCoords,
}: React.PropsWithChildren<TooltipPopoverProps>) => {
  const updateCoords = debounce(updateTooltipCoords, 100);

  useEffect(() => {
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, [updateCoords]);

  return (
    <div
      style={{ ...styles.popover, ...coords }}
      className="ant-popover ant-popover-placement-top"
    >
      <div className="ant-popover-content">
        <div className="ant-popover-arrow" />
        <div className="ant-popover-inner" role="tooltip">
          <div>
            <div className="ant-popover-title">Title</div>
            <div className="ant-popover-inner-content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  popover: {
    backgroundColor: 'white',
    position: "absolute",
    width: 200,
    border: '1px solid #ddd',
    padding: '4px',
  },
};

export default TooltipPopover;
