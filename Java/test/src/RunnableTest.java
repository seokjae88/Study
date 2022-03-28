public class RunnableTest {
    public static void main(String[] args) {
        foo r = new foo();
        Thread t = new Thread(r);
        t.start();
    }
}
class foo implements Runnable {
    @Override
    public void run() {
        System.out.println("11111111");
    }
}