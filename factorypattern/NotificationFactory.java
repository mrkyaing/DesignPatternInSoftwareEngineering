package factorypattern;

public class NotificationFactory {

	public static INotification createNotification(NotiType nt) {
		switch (nt) {
		case EMAIL:
			return new EmailNoti();
		case SMS:
			return new SMSNoti();
		default:
			throw new IllegalArgumentException("Oh,sorry , we dont have this type of noti.");
		}
	}
}
