package in.tms.springbootcrud.springbootcrudapi.csvloader;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import in.tms.springbootcrud.springbootcrudapi.dao.TicketDAO;
import in.tms.springbootcrud.springbootcrudapi.model.Ticket;

@Configuration
public class CsvTicketLoader implements CommandLineRunner {

    @Autowired
    private TicketDAO ticketDAO;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        // ✅ Step 4 logic
        if(ticketDAO.count() > 0) {
            System.out.println("Tickets already exist in DB. Skipping CSV load.");
            return;
        }

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                        getClass().getResourceAsStream("/tickets.csv")
                )
        );

        String line;
        boolean firstLine = true;

        while((line = reader.readLine()) != null) {

            if(firstLine) {
                firstLine = false;
                continue;
            }

            String[] data = line.split(",");

            Ticket ticket = new Ticket();
            ticket.setTitle(data[0]);
            ticket.setDescription(data[1]);
            ticket.setStatus(data[2]);
            ticket.setPriority(data[3]);
            ticket.setCategory(data[4]);
            ticket.setAssignedTo(data[5]);

            ticketDAO.save(ticket);
        }

        System.out.println("CSV tickets loaded successfully!");
    }
}