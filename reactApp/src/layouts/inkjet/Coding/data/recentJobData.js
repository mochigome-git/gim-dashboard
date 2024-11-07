import { useContext, useMemo } from "react";
import { IJCodingVer1Context } from "../../../../lib/realtime/inkjet/coding_ver1_realtime";

export default function Data() {
  const { ij } = useContext(IJCodingVer1Context);

  // Use `useMemo` to cache the result of `recentJobData` 
  const recentJobData = useMemo(() => {
    if (Array.isArray(ij.coding_log) && ij.coding_log.length > 0) {
      const { job_order, created_at, job_quantity, programmed, verified } = ij.coding_log[0];
      return {
        job: job_order,
        time: created_at
          ? new Date(created_at).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true,
            })
          : null,
        detail: ij.coding_log,
        total: job_quantity,
        program: programmed,
        verify: verified,
      };
    }
    return {};
  }, [ij.coding_log]);

  return recentJobData;
}
