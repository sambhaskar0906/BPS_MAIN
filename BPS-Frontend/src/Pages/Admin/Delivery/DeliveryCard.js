import React, { useEffect, useState } from 'react';
import {
    Typography,
    Card,
    CardContent,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchBookingsByType
} from '../../../features/booking/bookingSlice';
import {
    fetchBookingRequest as fetchQuotationRequest
} from '../../../features/quotation/quotationSlice';

const DeliveryCard = () => {
    const dispatch = useDispatch();

    // Booking state
    const {
        requestCount: bookingRequestCountValue,
        list: bookingList,
        loading: bookingLoading
    } = useSelector((state) => state.bookings);

    // Quotation state
    const {
        requestCount: quotationRequestCountValue,
        list: quotationList,
        loading: quotationLoading
    } = useSelector((state) => state.quotations);

    const [selectedCard, setSelectedCard] = useState('booking');

    useEffect(() => {
        dispatch(fetchBookingsByType('request'));
        dispatch(fetchQuotationRequest());
    }, [dispatch]);

    const handleCardClick = (type) => {
        setSelectedCard(type);
    };

    const cards = [
        {
            key: 'booking',
            count: bookingRequestCountValue || bookingList.length || 0,
            subtitle: 'Booking Delivery',
            stat: '20% (30 days)'
        },
        {
            key: 'quotation',
            count: quotationRequestCountValue || quotationList.length || 0,
            subtitle: 'Quotations Delivery',
            stat: 'NaN% (30 days)'
        },
        {
            key: 'final',
            count: 0,
            subtitle: 'Final Delivery',
            stat: 'NaN% (30 days)'
        }
    ];

    // Show list based on selected card
    const currentList = selectedCard === 'quotation'
        ? quotationList
        : selectedCard === 'final'
            ? []       // Empty array for final delivery for now
            : bookingList;

    const currentLoading = selectedCard === 'quotation'
        ? quotationLoading
        : selectedCard === 'final'
            ? false    // no loading for final (adjust if needed)
            : bookingLoading;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom color="primary">
                Manage Delivery
            </Typography>

            {/* Cards Section */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        onClick={() => handleCardClick(card.key)}
                        sx={{
                            width: '100%',
                            maxWidth: 260,
                            borderRadius: 3,
                            boxShadow: 4,
                            cursor: 'pointer',
                            background: selectedCard === card.key
                                ? 'linear-gradient(135deg, #90caf9, #64b5f6)'
                                : 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'scale(1.03)' }
                        }}
                    >
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" color="textPrimary">Delivery</Typography>
                                <LocalShippingIcon color="primary" />
                            </Box>
                            <Typography variant="h3" fontWeight={700} mt={2} color="primary.dark">
                                {card.count}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">{card.subtitle}</Typography>
                            <Typography variant="caption" color="textSecondary">{card.stat}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Filters */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                paddingY: 4,
                paddingX: 1,
                mt: 2,
                gap: 3,
            }}>
                {['Driver', 'Vehicle', 'Device'].map((label) => (
                    <FormControl
                        key={label}
                        size="small"
                        sx={{
                            minWidth: 220,
                            flex: '1 1 auto',
                            backgroundColor: 'white',
                            boxShadow: 1,
                            borderRadius: 2,
                        }}
                    >
                        <InputLabel>{label}</InputLabel>
                        <Select defaultValue="">
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={`${label} 1`}>{label} 1</MenuItem>
                            <MenuItem value={`${label} 2`}>{label} 2</MenuItem>
                        </Select>
                    </FormControl>
                ))}
                <Box sx={{ marginLeft: 'auto' }}>
                    <Button variant="contained" size="medium" sx={{ height: 40, paddingX: 4, borderRadius: 2 }}>
                        Add
                    </Button>
                </Box>
            </Box>

            {/* Table Header */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '80px 80px 1fr 1fr 1fr 1fr',
                backgroundColor: '#1976d2',
                padding: 2,
                borderRadius: 2,
                color: 'white',
                fontWeight: 600,
                mt: 2
            }}>
                <Typography>Select</Typography>
                <Typography>S. No</Typography>
                <Typography>Order ID</Typography>
                <Typography>Name</Typography>
                <Typography>Start Station</Typography>
                <Typography>Destination Station</Typography>
            </Box>

            {/* Table Body */}
            {currentLoading ? (
                <Typography sx={{ mt: 2 }}>Loading...</Typography>
            ) : currentList?.length > 0 ? (
                currentList.map((item, idx) => (
                    <Box key={item._id || idx} sx={{
                        display: 'grid',
                        gridTemplateColumns: '80px 80px 1fr 1fr 1fr 1fr',
                        padding: 2,
                        borderBottom: '1px solid #e0e0e0',
                        alignItems: 'center'
                    }}>
                        <input type="checkbox" />
                        <Typography>{idx + 1}</Typography>
                        <Typography>{item.bookingId || item["Booking ID"]}</Typography>
                        <Typography>{item.fromName || item.Name}</Typography>
                        <Typography>{item.pickup || item["Pick up"]}</Typography>
                        <Typography>{item.drop || item.Drop}</Typography>
                    </Box>
                ))
            ) : (
                <Typography sx={{ mt: 2 }}>
                    {selectedCard === 'final' ? 'No final deliveries found.' : 'No bookings found.'}
                </Typography>
            )}
        </Box>
    );
};

export default DeliveryCard;
