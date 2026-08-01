package designpattern;

public class House {
private int _door;
private int _window;
private int _wall;
private int _roof;
private int _kitchen;
private TV _tv;
private ISP _isp;

//enable for Door property to build house
public House setDoor(int d) {
	this._door=d;
	return this;
}
//enable for Window property to build house
public House setWindow(int w) {
	this._window=w;
	return this;
}
//enable for Roof property to build house
public House setRoof(int r) {
	this._roof=r;
	return this;
}
//enable for Kitchen property to build house
public House setKitchen(int c) {
	this._kitchen=c;
	return this;
}
//enable for Wall property to build house
public House setWall(int w) {
	this._wall=w;
	return this;
}

public House setTV(TV tv) {
	this._tv=tv;
	return this;
}

public House setInernet(ISP isp) {
	this._isp=isp;
	return this;
}

public ISP getInternet() {
	return _isp;
}

public int getRoof() {
	return this._roof;
}



@Override
public String toString() {
	return "House [door=" + _door +",window="+_window + ", wall=" + _wall + ", roof=" + _roof + ", kitchen=" + _kitchen + "]";
}

}
