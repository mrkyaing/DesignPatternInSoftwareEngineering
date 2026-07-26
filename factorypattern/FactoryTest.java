package factorypattern;

public class FactoryTest {
	public static void main(String[] args) {

		INotification noti = NotificationFactory.createNotification(NotiType.EMAIL);
		if (noti instanceof SMSNoti) {
			SMSNoti noti2 = (SMSNoti) noti;
			noti2.setPhoneNo("0974126985");
			noti2.setPower(true);
			noti2.setSmsMessage("How are you?");
		}
		if (noti instanceof EmailNoti) {
			EmailNoti noti1 = (EmailNoti) noti;
			noti1.setToEmail("mg@gmail.com");
			noti1.setSubject("apply isp");
			noti1.setBody("I want to install 5BB internet with 50MB monthly pay.");
		}
		noti.Send();
	}

}
