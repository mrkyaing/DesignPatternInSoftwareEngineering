package bridgepattern;

public class Radio implements IDevice{
	private boolean _on=false;
	private int _volume=10;
	private int _channel=88;
	
	@Override
	public void setEnable() {
		this._on=true;
	}
	@Override
	public void setDisable() {
		this._on=false;
	}
	@Override
	public int getVolume() {
		return this._volume;
	}
	@Override
	public void setVolume(int v) {
		this._volume=v;
	}
	@Override
	public int getChannel() {
		return this._channel;
	}
	@Override
	public void setChannel(int c) {
		this._channel=c;
	}
	
	@Override
	public boolean isEnable() {
		return this._on;
	}
}
