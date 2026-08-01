package bridgepattern;

public class AdvanceRemote extends Remote {

//define a bridge pattern based on parent/superclass
public AdvanceRemote(IDevice d) {
	super(d);
}

public void mute() {
	_device.setVolume(0);
	System.out.println("MUTED");
}
public void factoryReset() {
	_device.setChannel(1);
	_device.setVolume(20);
	_device.setEnable();
	System.out.println("Set Default Settings...");
	System.out.println("Volume:"+_device.getVolume());
	System.out.println("Channel:"+_device.getChannel());
	System.out.println("Is Enable?:"+_device.isEnable());
}
}
