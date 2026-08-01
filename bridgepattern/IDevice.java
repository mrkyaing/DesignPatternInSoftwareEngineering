package bridgepattern;

public interface IDevice {
	//set for enable and disable
	void setEnable();
	void setDisable();
	//volume functions
	int getVolume();
	void setVolume(int v);
	//channel setting functions
	int getChannel();
	void setChannel(int c);
	//open/close functions
	boolean isEnable();
}
