package ExecutorService;

import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.ArrayList;

public class CustomerService {
    private ExecutorService executorService;
    private List<Worker> mWorker;

    public CustomerService() {
        this.executorService = Executors.newFixedThreadPool(4);
        this.mWorker = new ArrayList();
    }

    public void startWork(){
        // Start work with ExecutorService

        int threadIdSeq = 0;
        while(threadIdSeq < 10){
            // Create executorLab.Job for executorLab.Worker
            Random random = new Random();

            Job job = new Job();
            job.setFirst(random.nextInt());
            job.setSecond(random.nextInt());

            // Set job for worker and ready
            Worker worker = new Worker(threadIdSeq, job);
            mWorker.add(worker);
            // Start job worker to ExecutorService
            executorService.submit(worker);

            threadIdSeq++;

            // Wait for some time to prevent overload
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        executorService.submit(mWorker.get(1));
    }

    public static void main(String args[]){
        CustomerService customerService = new CustomerService();
        customerService.startWork();
    }
}
