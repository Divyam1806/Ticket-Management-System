package in.tms.springbootcrud.springbootcrudapi.service;

import java.util.List;
import java.util.Map;

import in.tms.springbootcrud.springbootcrudapi.model.Ticket;

public interface TicketService {

    List<Ticket> get();

    Ticket get(int id);

    void save(Ticket ticket);

    void delete(int id);

    // SUMMARY METHODS
    List<Object[]> getTicketSummaryByCategory();

    List<Object[]> getTicketSummaryByPriority();

	List<Map<String, Object>> getUtilizationReport();
}