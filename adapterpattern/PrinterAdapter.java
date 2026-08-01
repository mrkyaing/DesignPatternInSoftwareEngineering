package adapterpattern;

public class PrinterAdapter implements IPrinter{
	private PrinterType _pt;
	
   public PrinterAdapter() { 
	   
   }
	
   //define a constructor to set from client code (printer type)
	public PrinterAdapter(PrinterType pt) {
		this._pt=pt;
   }
	private LegacyPrinter lp=new LegacyPrinter();
	private EpsonPrinter ep=new EpsonPrinter() ;
			
	@Override
	public void print() {
		switch(this.getPt()) {
		case Legancy:lp.printWithLegancy(); break;
		case Epson:ep.printWithEpson();break;
		default:System.out.println("Opos,no "+this.getPt()+" printer on this PC.");break;
		}
	}
	public PrinterType getPt() {
		return _pt;
	}
	public void setPt(PrinterType pt) {
		this._pt = pt;
	}
}
