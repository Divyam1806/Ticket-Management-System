package in.tms.springbootcrud.springbootcrudapi.dao;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import in.tms.springbootcrud.springbootcrudapi.model.AuditLog;
import jakarta.persistence.EntityManager;

@Repository
public class AuditLogDAOImpl implements AuditLogDAO {

    @Autowired
    private EntityManager entityManager;

    @Override
    public void save(AuditLog auditLog) {

        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.persist(auditLog);

    }
}
