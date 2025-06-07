This assignment was not very straightforward, and I encountered many issues while doing it. As such, the App.js might not work OOTB, and some configuration might be neede. Please let me know if any issues arise so that I can explain the work process.


I was unable to use tux, and as such, used XMAPP to host the backend files (sendMessage.php and retrieveMessages.php). As such, they had to go into a seperate folder within XAMPP files. I have brought them here in this repo for you to be able to see the code.


The prohram consists of two screens, SenderScreen and ReceiverScreen, which utilize sendMessage.php and retrieveMessages.php respectively.


sendMessage.php utilized PUSH, and retrieveMessages.php makes use of GET.


"C:\Users\somay\OneDrive\Desktop\WhatsApp Image 2025-06-07 at 17.45.32_e4cd3cbb.jpg"
The above image is a screenshot of the SenderScreen when no parameters have been provided in the URL.


![imagealt](https://github.com/SohanSomaya/INFO670/blob/8e2f6bcd9530aba139b6fe74815c56b7e9a8f76e/FinalAssignment/WhatsApp%20Image%202025-06-07%20at%2017.45.32_5585323b.jpg)

The above image is a screenshot of the SenderScreen when sender, receiver and message parameters are all filled.
http://10.185.249.41/FinalAssignment/backend/sendMessage.php?sender=alice&%20recipient=bob&message=hello


![imagealt](https://github.com/SohanSomaya/INFO670/blob/8e2f6bcd9530aba139b6fe74815c56b7e9a8f76e/FinalAssignment/WhatsApp%20Image%202025-06-07%20at%2017.45.32_5585323b.jpg)

The above image is a screenshot of the ReceiverScreen, with the parameter in the URL being that of the receiver.
http://10.185.249.41/FinalAssignment/backend/retrieveMessages.php?recipient=bob
