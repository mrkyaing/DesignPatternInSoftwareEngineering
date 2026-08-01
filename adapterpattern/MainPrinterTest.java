package adapterpattern;

public class MainPrinterTest {
 
	public static void main(String[] args) {
		PrinterAdapter adapter=new PrinterAdapter(PrinterType.Hp);
		clientPrinterCode(adapter);
	}//end of main 
	
	//define a method to choose client printer code
	private static void clientPrinterCode(IPrinter p) {
		p.print();
	}

}
