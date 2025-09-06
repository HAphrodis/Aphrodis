import { useAuditLogStore } from "@/store/auditLogStore";

/**
 * Creates an audit log entry
 * @param action The action performed
 * @param details Additional details about the action
 */
export async function createAuditLog(action: string, details = "") {
  try {
    // Get the createLog function from the store
    const createLog = useAuditLogStore.getState().createLog;

    // Create the audit log
    await createLog(action, details);

    return true;
  } catch (error) {
    console.error("Failed to create audit log:", error);
    return false;
  }
}
