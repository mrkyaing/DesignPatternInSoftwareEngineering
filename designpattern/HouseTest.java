package designpattern;

public class HouseTest {

public static void main(String[] args) {
      House myHouse=new House().setDoor(2).setWindow(4).setRoof(1);
      System.out.println(myHouse);
      if(myHouse.getRoof()>0) {
    	  System.out.println("we can enjoy the party with friends on FRIDAY OR WEEKENDS!");
      }
      else{
    	  System.out.println("Oh,sorry:let move to outside to enjoy!");
      }
      
      System.out.println("another house");
      House yourHouse=new House().setDoor(1).setWindow(3);
      yourHouse.setRoof(1);
    System.out.println(yourHouse);
    if(yourHouse.getRoof()>0) {
  	  System.out.println("we can enjoy the party with friends on FRIDAY OR WEEKENDS!");
    }
    else{
  	  System.out.println("Oh,sorry:let move to outside to enjoy!");
    }
    
    
    //create a tv object with builder pattern
    TV tv=new TV().setBrand("SONY")
    		.setModel("S001")
    		.setPrice(500000)
    		.setWifiEnable(false)
    		.setPower(false)
    		.setHdmiEnable(true);
    //create an isp object with setter methods
    ISP isp=new ISP();
    isp.setBandWidth("50MB");
    isp.setName("5BB");
    isp.setPower(false);
    isp.setAccessiableInternet(true);
    //create a house with builder pattern
    House uncleHouse=new House().setDoor(1).setWindow(3).setRoof(1).setTV(tv).setInernet(isp);
    System.out.println(tv);//get the information of tv
    System.out.println(isp);//get the information of isp
    System.out.println(uncleHouse);// get the information of uncle house
    System.out.println("information of uncle house !! what are the status?");
    tv.turnOnTV();
    if(isp.isAccessiableInternet()) {
        tv.connectedToInternet();
    }else {
    	System.out.println("oh,router is power on but NO internet.");
    }
}
}
