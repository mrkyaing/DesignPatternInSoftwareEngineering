package bridgepattern;

public class ClientMain {

	public static void main(String[] args) {
     System.out.println("Testing the Basic Remote with TV");
     //create a TV object
     TV tv=new TV();
     Remote br=new Remote(tv);
     br.togglePower();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     br.volumeUp();
     System.out.println("Testing the Advance Remote with TV");
     TV tv2=new TV();
     AdvanceRemote ar=new AdvanceRemote(tv2);
     ar.togglePower();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeDown();
     ar.volumeUp();
     ar.mute();
     //ar.factoryReset();
	}

}
