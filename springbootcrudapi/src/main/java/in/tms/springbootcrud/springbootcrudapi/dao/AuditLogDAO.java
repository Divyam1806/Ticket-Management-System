package in.tms.springbootcrud.springbootcrudapi.dao;

import in.tms.springbootcrud.springbootcrudapi.model.AuditLog;


public interface AuditLogDAO {

    void save(AuditLog auditLog);

}