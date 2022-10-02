namespace server.Entities.OrderAggregate
{
    //สถานะการช าระเงิน
    public enum OrderStatus
    {
        Pending,
        PaymentReceived,
        PaymentFailed
    }
}