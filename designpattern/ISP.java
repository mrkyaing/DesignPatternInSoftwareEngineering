package designpattern;

public class ISP {

private String _name;
private String _bandWidth;
private boolean power,accessiableInternet;

public boolean isPower() {
	return power;
}

public void setPower(boolean power) {
	this.power = power;
}

public boolean isAccessiableInternet() {
	return accessiableInternet;
}

public void setAccessiableInternet(boolean accessiableInternet) {
	this.accessiableInternet = accessiableInternet;
}

public void setName(String name) {
	this._name=name;
}

public void setBandWidth(String bw) {
	this._bandWidth=bw;
}

@Override
public String toString() {
	return "ISP(Internet Service Provider) [name=" + _name + ", BandWidth=" + _bandWidth + "]";
}

}
