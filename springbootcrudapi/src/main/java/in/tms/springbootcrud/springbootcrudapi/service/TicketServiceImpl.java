package in.tms.springbootcrud.springbootcrudapi.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.tms.springbootcrud.springbootcrudapi.dao.AuditLogDAO;
import in.tms.springbootcrud.springbootcrudapi.dao.TicketDAO;
import in.tms.springbootcrud.springbootcrudapi.model.AuditLog;
import in.tms.springbootcrud.springbootcrudapi.model.Ticket;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketDAO ticketDAO;

    @Autowired
    private AuditLogDAO auditLogDAO;

    // Helper method for logging
    private void logAction(String action, String details) {
        AuditLog log = new AuditLog(action, details);
        auditLogDAO.save(log);
    }

    // GET ALL TICKETS
    @Override
    public List<Ticket> get() {

        List<Ticket> tickets = ticketDAO.get();

        logAction("READ", "Fetched all tickets");

        return tickets;
    }

    // GET TICKET BY ID
    @Override
    public Ticket get(int id) {

        Ticket ticket = ticketDAO.get(id);

        logAction("READ", "Fetched ticket with ID: " + id);

        return ticket;
    }

    // CREATE OR UPDATE TICKET
    @Override
    public void save(Ticket ticket) {

        boolean isNew = (ticket.getId() == 0);

        ticketDAO.save(ticket);

        if (isNew) {
            logAction("CREATE", "Created ticket with title: " + ticket.getTitle());
        } else {
            logAction("UPDATE", "Updated ticket with ID: " + ticket.getId());
        }
    }

    // DELETE TICKET
    @Override
    public void delete(int id) {

        ticketDAO.delete(id);

        logAction("DELETE", "Deleted ticket with ID: " + id);
    }

    // CATEGORY SUMMARY REPORT
    @Override
    public List<Object[]> getTicketSummaryByCategory() {

        List<Object[]> result = ticketDAO.getTicketSummaryByCategory();

        logAction("REPORT", "Generated ticket summary by category");

        return result;
    }

    // PRIORITY SUMMARY REPORT
    @Override
    public List<Object[]> getTicketSummaryByPriority() {

        List<Object[]> result = ticketDAO.getTicketSummaryByPriority();

        logAction("REPORT", "Generated ticket summary by priority");

        return result;
    }

    // UTILIZATION REPORT
    @Override
    public List<Map<String, Object>> getUtilizationReport() {

        List<Object[]> memberCounts = ticketDAO.getTicketsPerMember();
        Long totalTickets = ticketDAO.getTotalTickets();

        List<Map<String, Object>> report = new ArrayList<>();

        for (Object[] row : memberCounts) {

            String member = (String) row[0];

            Number countNumber = (Number) row[1];
            long count = countNumber.longValue();

            double utilization = 0;

            if (totalTickets != 0) {
                utilization = ((double) count / totalTickets) * 100;
            }

            Map<String, Object> data = new HashMap<>();
            data.put("member", member);
            data.put("tickets", count);
            data.put("utilization", utilization);

            report.add(data);
        }

        logAction("REPORT", "Generated utilization report");

        return report;
    }
}