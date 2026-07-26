package factorypattern;
import java.awt.Toolkit;

public class SMSNoti implements INotification{
private String phoneNo,smsMessage;
private boolean power;

public String getPhoneNo() {
	return phoneNo;
}

public void setPhoneNo(String phoneNo) {
	this.phoneNo = phoneNo;
}

public boolean isPower() {
	return power;
}

public void setPower(boolean power) {
	this.power = power;
}

	public String getSmsMessage() {
	return smsMessage;
}

public void setSmsMessage(String smsMessage) {
	this.smsMessage = smsMessage;
}

@Override
public boolean Notify() {
	if (isPower() && phoneNo != null && !phoneNo.trim().isEmpty()) {
		System.out.println("=====================");
		System.out.println("notify SMS");
		System.out.println("=====================");
		return true;
	}

	return false;
}

	@Override
	public void Send() {
		if (!Notify()) {
            System.out.println("no message in content.");
            return;
        }
        if (smsMessage != null && !smsMessage.trim().isEmpty()) {
            System.out.println("Received message: " + smsMessage);
            System.out.println("Received From: " +phoneNo);
            Toolkit.getDefaultToolkit().beep();
        } else {
            System.out.println("no message in content.");
        }
		
	}

}
