package designpattern;

public class TV {
private String model,brand;
private boolean wifiEnable,hdmiEnable,usbEnable,mobileControlEnable,power,volume;
private float price;

public void turnOnTV() {
	if(this.isPower()) {
		System.out.println("Turn On TV");
	}else {
		System.out.println("plug in your power cable into socket.");
	}
}


public void connectedToInternet() {
	if(this.isWifiEnable()) {
		System.out.println("Enjoy the internet movies");
	}else {
		System.out.println("Oh,Sorry your TV do not support wifi enable function so it cannot connect to internet.");
	}
}

public String getModel() {
	return model;
}

public TV setModel(String model) {
	this.model = model;
	return this;
}

public String getBrand() {
	return brand;
}

public TV setBrand(String brand) {
	this.brand = brand;
	return this;
}

public boolean isWifiEnable() {
	return wifiEnable;
}

public TV setWifiEnable(boolean wifiEnable) {
	this.wifiEnable = wifiEnable;
	return this;
}

public boolean isHdmiEnable() {
	return hdmiEnable;
}

public TV setHdmiEnable(boolean hdmiEnable) {
	this.hdmiEnable = hdmiEnable;
	return this;
}

public boolean isUsbEnable() {
	return usbEnable;
}

public TV setUsbEnable(boolean usbEnable) {
	this.usbEnable = usbEnable;
	return this;
}

public boolean isMobileControlEnable() {
	return mobileControlEnable;
}

public TV setMobileControlEnable(boolean mobileControlEnable) {
	this.mobileControlEnable = mobileControlEnable;
	return this;
}

public float getPrice() {
	return price;
}

public TV setPrice(float price) {
	if(price>0) {
		this.price = price;
	}
	return this;

}

public boolean isPower() {
	return power;
}

public TV setPower(boolean power) {
	this.power = power;
	return this;
}

public boolean isVolume() {
	return volume;
}

public TV setVolume(boolean volume) {
	this.volume = volume;
	return this;
}


@Override
public String toString() {
	return "TV [model=" + model + ", brand=" + brand + ", wifiEnable=" + wifiEnable + ", hdmiEnable=" + hdmiEnable
			+ ", usbEnable=" + usbEnable + ", mobileControlEnable=" + mobileControlEnable + ", power=" + power
			+ ", volume=" + volume + ", price=" + price + "]";
}

}
