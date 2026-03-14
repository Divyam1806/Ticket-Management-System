package in.tms.springbootcrud.springbootcrudapi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_log")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String actionType;

    private LocalDateTime timestamp;

    @Column(columnDefinition = "TEXT")
    private String details;

    public AuditLog() {}

    public AuditLog(String actionType, String details) {
        this.actionType = actionType;
        this.details = details;
        this.timestamp = LocalDateTime.now();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	@Override
	public String toString() {
		return "AuditLog [id=" + id + ", actionType=" + actionType + ", timestamp=" + timestamp + ", details=" + details
				+ "]";
	}

}