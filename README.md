# Hotel Booking Management System

This application is a Hotel Booking Management System built with JavaScript and jQuery. It leverages the ADMINLTE template for its user interface and incorporates logic to manage states.

## Configuration

1. **Copy Configuration File:**
   - Duplicate the `config.json.example` file and rename it to `config.json`.

2. **Configure Proxy Settings:**
   - Open the `config.json` file.
   - Adjust the following parameters according to your requirements:
     - `port`: Specify the port number on which the application will run.
     - `url`: Set the URL for accessing the hotel-proxy.
     - `protocol`: Define the protocol used to communicate with the hotel-proxy.

## CORS Handling

To address CORS restrictions on the external API (https://restful-booker.herokuapp.com), a proxy server (`hotel-proxy`) has been implemented using Ruby on Rails. Ensure that the proxy server is set up and running.

### Hotel Proxy Repository

The Ruby on Rails proxy server repository can be found at:
[Hotel Bookings Proxy Repository](https://github.com/Senzenjani/hotel-bookings-proxy)

## Running the Application

1. **Start the Frontend:**
   - Open the `index.html` file in a web browser.

2. **Start the Proxy Server:**
   - Follow the instructions in the [Hotel Bookings Proxy Repository](https://github.com/Senzenjani/hotel-bookings-proxy) to set up and run the Ruby on Rails proxy server.

   - Note: The proxy server handles CORS and facilitates communication with the external API.

## Need Help?

If you encounter any issues or have questions, please do not hesitate to reach out. Feel free to open an issue in the respective repositories or contact us at [your-email@example.com].

Feel free to paste this into your README file and replace `[your-email@example.com]` with your actual contact email.
