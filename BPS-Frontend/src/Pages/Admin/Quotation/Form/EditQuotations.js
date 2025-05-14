import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography,
    InputAdornment,
    Snackbar,
    Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const stationOptions = ["Station A", "Station B", "Station C"];
const states = ["State A", "State B", "State C"];
const cities = ["City A", "City B", "City C"];
const payOptions = ["None", "To Pay", "Paid"];

// Function to generate random data
const generateRandomData = () => {
    const randomDate = () => {
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 30);
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const randomItem = () => ({
        name: `Product ${Math.floor(Math.random() * 100)}`,
        quantity: Math.floor(Math.random() * 10) + 1,
        price: (Math.random() * 1000).toFixed(2),
        weight: (Math.random() * 50).toFixed(2),
        toPayPaid: payOptions[Math.floor(Math.random() * payOptions.length)],
    });

    return {
        firstName: ["John", "Jane", "Robert", "Emily"][Math.floor(Math.random() * 4)],
        lastName: ["Doe", "Smith", "Johnson", "Williams"][Math.floor(Math.random() * 4)],
        startStationName: stationOptions[Math.floor(Math.random() * stationOptions.length)],
        endStation: stationOptions[Math.floor(Math.random() * stationOptions.length)],
        locality: ["Main St", "Park Ave", "Broadway", "5th Ave"][Math.floor(Math.random() * 4)],
        quotationDate: randomDate(),
        proposedDeliveryDate: randomDate(),
        fromCustomerName: `Customer ${Math.floor(Math.random() * 100)}`,
        fromAddress: `${Math.floor(Math.random() * 1000)} ${["Main St", "Oak St", "Pine St"][Math.floor(Math.random() * 3)]}`,
        fromState: states[Math.floor(Math.random() * states.length)],
        fromCity: cities[Math.floor(Math.random() * cities.length)],
        fromPincode: Math.floor(100000 + Math.random() * 900000).toString(),
        toCustomerName: `Customer ${Math.floor(Math.random() * 100)}`,
        toAddress: `${Math.floor(Math.random() * 1000)} ${["Main St", "Oak St", "Pine St"][Math.floor(Math.random() * 3)]}`,
        toState: states[Math.floor(Math.random() * states.length)],
        toCity: cities[Math.floor(Math.random() * cities.length)],
        toPincode: Math.floor(100000 + Math.random() * 900000).toString(),
        amount: (Math.random() * 1000).toFixed(2),
        freight: (Math.random() * 500).toFixed(2),
        sgst: (Math.random() * 10).toFixed(2),
        sTax: (Math.random() * 5).toFixed(2),
        additionalCmt: ["Fragile", "Handle with care", "Urgent delivery"][Math.floor(Math.random() * 3)],
        productDetails: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, randomItem),
        addComment: ["Special instructions here", "Contact before delivery", ""][Math.floor(Math.random() * 3)],
        ins_vpp: (Math.random() * 200).toFixed(2),
        billTotal: (Math.random() * 2000).toFixed(2),
        cgst: (Math.random() * 10).toFixed(2),
        igst: (Math.random() * 10).toFixed(2),
        grandTotal: (Math.random() * 2500).toFixed(2),
    };
};

const initialValues = generateRandomData();

const EditQuotationForm = () => {
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log("Form Submitted:", values);
                    setSnackbar({
                        open: true,
                        message: "Quotation updated successfully!",
                        severity: "success",
                    });
                }}
            >
                {({ values, handleChange, setFieldValue }) => {
                    const handleUpdate = (index) => {
                        const item = values.productDetails[index];

                        if (!item.quantity || !item.weight || !item.price) {
                            setSnackbar({
                                open: true,
                                message: "Please fill all required fields for this item",
                                severity: "error",
                            });
                            return;
                        }

                        console.log("Updating item:", item);
                        setSnackbar({
                            open: true,
                            message: `Item ${index + 1} updated successfully!`,
                            severity: "success",
                        });
                    };

                    return (
                        <Form>
                            <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Edit Customer Quotation
                                    </Typography>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Start Station"
                                            name="startStationName"
                                            value={values.startStationName}
                                            onChange={handleChange}
                                        >
                                            {stationOptions.map((s) => (
                                                <MenuItem key={s} value={s}>
                                                    {s}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Destination Station"
                                            name="endStation"
                                            value={values.endStation}
                                            onChange={handleChange}
                                        >
                                            {stationOptions.map((s) => (
                                                <MenuItem key={s} value={s}>
                                                    {s}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <DatePicker
                                                label="Quotation Date"
                                                value={values.quotationDate}
                                                onChange={(val) => setFieldValue("quotationDate", val)}
                                                renderInput={(params) => (
                                                    <TextField fullWidth {...params} name="quotationDate" />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }} >
                                            <DatePicker
                                                label="Proposed Delivery Date"
                                                value={values.proposedDeliveryDate}
                                                onChange={(val) => setFieldValue("proposedDeliveryDate", val)}
                                                minDate={values.quotationDate || new Date()}
                                                renderInput={(params) => (
                                                    <TextField
                                                        fullWidth
                                                        {...params}
                                                        name="proposedDeliveryDate"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 9 }}>
                                        <Typography fontWeight="bold">
                                            Customer Name/Number
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Search for customer"
                                            name="fromCustomerName"
                                            value={values.fromCustomerName}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 3 }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<AddIcon />}
                                            type="button"
                                        >
                                            Register
                                        </Button>
                                    </Grid>

                                    {["firstName", "lastName"].map((name) => (
                                        <Grid size={{ xs: 12, sm: 6 }} key={name}>
                                            <TextField
                                                fullWidth
                                                label={name === "firstName" ? "First Name" : "Last Name"}
                                                name={name}
                                                value={values[name]}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    ))}

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Contact Number"
                                            name="contactNumber"
                                            value={values.contactNumber || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            value={values.email || ""}
                                            onChange={handleChange}
                                            type="email"
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="h6">From (Address)</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            name="fromCustomerName"
                                            value={values.fromCustomerName}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="GST Number"
                                            name="fromGST"
                                            value={values.fromGST || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Locality / Street"
                                            name="fromAddress"
                                            value={values.fromAddress}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="State"
                                            name="fromState"
                                            value={values.fromState}
                                            onChange={handleChange}
                                        >
                                            {states.map((s) => (
                                                <MenuItem key={s} value={s}>
                                                    {s}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="City"
                                            name="fromCity"
                                            value={values.fromCity}
                                            onChange={handleChange}
                                        >
                                            {cities.map((c) => (
                                                <MenuItem key={c} value={c}>
                                                    {c}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Pin Code"
                                            name="fromPincode"
                                            value={values.fromPincode}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="h6">To (Address)</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            name="toCustomerName"
                                            value={values.toCustomerName}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="GST Number"
                                            name="toGST"
                                            value={values.toGST || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Locality / Street"
                                            name="toAddress"
                                            value={values.toAddress}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="State"
                                            name="toState"
                                            value={values.toState}
                                            onChange={handleChange}
                                        >
                                            {states.map((s) => (
                                                <MenuItem key={s} value={s}>
                                                    {s}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="City"
                                            name="toCity"
                                            value={values.toCity}
                                            onChange={handleChange}
                                        >
                                            {cities.map((c) => (
                                                <MenuItem key={c} value={c}>
                                                    {c}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Pin Code"
                                            name="toPincode"
                                            value={values.toPincode}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="h6">Product Details</Typography>
                                    </Grid>

                                    <FieldArray name="productDetails">
                                        {({ push, remove }) => (
                                            <>
                                                {values.productDetails.map((item, index) => (
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        key={index}
                                                        alignItems="center"
                                                        sx={{ mb: 2 }}
                                                    >
                                                        <Grid size={{ xs: 0.5 }}>
                                                            <Typography>{index + 1}.</Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 12, sm: 3, md: 2.5 }}>
                                                            <Field
                                                                as={TextField}
                                                                fullWidth
                                                                size="small"
                                                                label="Name"
                                                                name={`productDetails[${index}].name`}
                                                                value={item.name}
                                                            />
                                                        </Grid>
                                                        <Grid size={{ xs: 12, sm: 3, md: 2.5 }}>
                                                            <Field
                                                                as={TextField}
                                                                fullWidth
                                                                size="small"
                                                                label="Quantity"
                                                                name={`productDetails[${index}].quantity`}
                                                                value={item.quantity}
                                                                type="number"
                                                            />
                                                        </Grid>
                                                        <Grid size={{ xs: 12, sm: 3, md: 2.5 }}>
                                                            <Field
                                                                as={TextField}
                                                                fullWidth
                                                                size="small"
                                                                label="Price"
                                                                name={`productDetails[${index}].price`}
                                                                value={item.price}
                                                                type="number"
                                                            />
                                                        </Grid>
                                                        <Grid size={{ xs: 12, sm: 3, md: 2.5 }}>
                                                            <Field
                                                                as={TextField}
                                                                fullWidth
                                                                size="small"
                                                                label="Weight (kg)"
                                                                name={`productDetails[${index}].weight`}
                                                                value={item.weight}
                                                                type="number"
                                                            />
                                                        </Grid>
                                                        <Grid size={{ xs: 12, sm: 3, md: 1.5 }}>
                                                            <TextField
                                                                select
                                                                fullWidth
                                                                size="small"
                                                                label="To Pay/Paid"
                                                                name={`productDetails[${index}].toPayPaid`}
                                                                value={item.toPayPaid}
                                                                onChange={handleChange}
                                                            >
                                                                {payOptions.map((p) => (
                                                                    <MenuItem key={p} value={p}>
                                                                        {p}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </Grid>
                                                        <Grid size={{ xs: 3, sm: 1.5, md: 1 }}>
                                                            <Button
                                                                color="primary"
                                                                onClick={() => handleUpdate(index)}
                                                                variant="contained"
                                                                fullWidth
                                                                size="small"
                                                            >
                                                                Update
                                                            </Button>
                                                        </Grid>
                                                        <Grid size={{ xs: 3, sm: 1.5, md: 1 }}>
                                                            <Button
                                                                color="error"
                                                                onClick={() => remove(index)}
                                                                variant="outlined"
                                                                fullWidth
                                                                size="small"
                                                            >
                                                                Remove
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                ))}

                                                <Grid size={{ xs: 12 }}>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        startIcon={<AddIcon />}
                                                        onClick={() =>
                                                            push({
                                                                name: "",
                                                                quantity: "",
                                                                price: "",
                                                                weight: "",
                                                                toPayPaid: "None",
                                                            })
                                                        }
                                                    >
                                                        Add Item
                                                    </Button>
                                                </Grid>
                                            </>
                                        )}
                                    </FieldArray>

                                    <Grid size={{ xs: 12, md: 9 }}>
                                        <TextField
                                            name="additionalCmt"
                                            label="Additional Comments"
                                            multiline
                                            minRows={3}
                                            fullWidth
                                            value={values.additionalCmt}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 3 }}>
                                        <Grid container spacing={2}>
                                            {[
                                                ["freight", "Freight"],
                                                ["sgst", "SGST"],
                                                ["cgst", "CGST"],
                                                ["igst", "IGST"],
                                                ["grandTotal", "Grand Total"],
                                            ].map(([name, label]) => (
                                                <Grid size={{ xs: 6 }} key={name}>
                                                    <TextField
                                                        name={name}
                                                        label={label}
                                                        value={values[name]}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        size="small"
                                                        InputProps={{
                                                            startAdornment: name !== "grandTotal" ? (
                                                                <InputAdornment position="start">₹</InputAdornment>
                                                            ) : null,
                                                        }}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 2 }}
                                        >
                                            Update Quotation
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Snackbar
                                open={snackbar.open}
                                autoHideDuration={6000}
                                onClose={handleCloseSnackbar}
                                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            >
                                <Alert
                                    onClose={handleCloseSnackbar}
                                    severity={snackbar.severity}
                                    sx={{ width: "100%" }}
                                >
                                    {snackbar.message}
                                </Alert>
                            </Snackbar>
                        </Form>
                    );
                }}
            </Formik>
        </LocalizationProvider>
    );
};

export default EditQuotationForm;