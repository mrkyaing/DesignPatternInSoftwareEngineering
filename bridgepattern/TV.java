package bridgepattern;

public class TV implements IDevice,IDevice2{
	private boolean _on=false;
	private int _volume=20;
	private int _channel=5;
	private String _model,_brand;
	
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
	@Override
	public void setModel(String m) {
		this._model=m;
		
	}
	@Override
	public void setBrand(String b) {
		this._brand=b;
	}
	@Override
	public String deviceSpecification() {
		return "Brand:"+this._brand+",Model:"+this._model;
	}
}
