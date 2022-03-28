public class RunnableLambdaExample {

    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            String threadName = Thread.currentThread().getName();
            System.out.println(threadName);
        });
        thread.setName("Thread #1");
        thread.start();
    }

}
