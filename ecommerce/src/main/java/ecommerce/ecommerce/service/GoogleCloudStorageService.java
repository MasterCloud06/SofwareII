package ecommerce.ecommerce.service;
import com.google.cloud.storage.Storage;
import org.springframework.stereotype.Service;

@Service
public class GoogleCloudStorageService {

    private final Storage storage;

    public GoogleCloudStorageService(Storage storage) {
        this.storage = storage;
    }

    public void listBuckets() {
        storage.list().iterateAll().forEach(bucket -> System.out.println(bucket.getName()));
    }
}
