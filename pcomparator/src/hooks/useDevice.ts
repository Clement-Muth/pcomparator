import { useContext } from "react";
import { DeviceContext } from "pcomparator/src/core/DeviceProvider";

const useDevice = () => useContext(DeviceContext);

export default useDevice;
