package factorypattern;

import java.awt.Toolkit;
public class EmailNoti implements INotification {
	private String toEmail;
	private String subject, body;

	public String getToEmail() {
		return toEmail;
	}
	public void setToEmail(String toEmail) {
		this.toEmail = toEmail;
	}


	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	
	@Override
	public boolean Notify() {
		if (this.getToEmail().contains("@")) {
			System.out.println("=====================");
			System.out.println("notify Email");
			System.out.println("=====================");
			return true;
		}else {
			System.out.println("invalid email format.");
		}
		return false;
	}
	@Override
	public void Send() {
		if (this.Notify()==true) {
			if (!this.getBody().equals(null) && !this.getBody().equals(" ") && !this.getSubject().equals(null) && !this.getSubject().equals(" ")) {
				System.out.println("From:"+this.getToEmail());
				System.out.println("Subject:"+this.getSubject());
				System.out.println("Body:"+this.getBody());
				Toolkit.getDefaultToolkit().beep();
			} else {
				System.out.println("No subject and body : this will be a spam mail.");
			}
		}
	}

}
