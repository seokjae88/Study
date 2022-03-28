package ExecutorService;

public class Worker implements Runnable {
    public Worker(int id, Job job) {
        this.id = id;
        this.job = job;
    }

    private int id;
    private Job job;

    public Worker() {

    }

    public void run() {
        // executorLab.Worker doing simple work.
        // add first and second.
        // finally print value and finish
        int sum = this.job.getFirst() + this.job.getSecond();

        System.out.println("id : " + id + " = " + sum);
    }
}
