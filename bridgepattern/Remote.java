package bridgepattern;

public class Remote {

//composition as a bride to know/invoke device's function
protected IDevice _device;

public Remote(IDevice d) {
	this._device=d;
}

public void togglePower() {
	if(_device.isEnable()) {
		_device.setDisable();
		System.out.println("POWER OFF...");
	}else {
		_device.setEnable();
		System.out.println("POWER ON...");
	}
}
public void volumeUp() {
	if(_device.getVolume()>=100) {
		_device.setVolume(100);
	}else {
	_device.setVolume(_device.getVolume()+5);
	}
	System.out.println("Volume:"+_device.getVolume());
}

public void volumeDown() {
	if(_device.getVolume()<=0) {
		_device.setVolume(0);
	}else {	
		_device.setVolume(_device.getVolume()-5);
	}
	System.out.println("Volume:"+_device.getVolume());
}

public void channelUp() {
	_device.setChannel(_device.getChannel()+1);
	System.out.println("Channel:"+_device.getChannel());
}
public void ChannelDown() {
	_device.setChannel(_device.getChannel()-1);
	System.out.println("Channel:"+_device.getChannel());
}
}
