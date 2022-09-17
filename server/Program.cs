using server.Data;
using Microsoft.EntityFrameworkCore;
using server.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StoreContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DatabaseConnection"));
});

#region CORS
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                        policy =>
                        {
                            policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials()
                            .WithOrigins("http://localhost:3001", "http://127.0.0.1:3001");
                        });
});
#endregion

var app = builder.Build();

#region //สร้ำงข้อมูลจ ำลอง Fake data
using var scope = app.Services.CreateScope(); //using หลังท ำงำนเสร็จจะถูกท ำลำยจำกMemory
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    await context.Database.MigrateAsync(); //สร้ำง DB ให้อัตโนมัติถ้ำยังไม่มี
    await DbInitializer.Initialize(context); //สร้ำงข้อมูลสินค้ำจ ำลอง
}
catch (Exception ex)
{
    logger.LogError(ex, "Problem migrating data");
}
#endregion

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

// app.UseHttpsRedirection();

#region ส่ง error ไปให้ Axios ตอนทำ Interceptor
app.UseMiddleware<ExceptionMiddleware>();
#endregion

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseDefaultFiles(); // อนุญาตให้เรียกไฟล์ต่างๆ ใน wwwroot
app.UseStaticFiles();  // อนุญาตให้เข้าถึงไฟล์ค่าคงที่ได้

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();