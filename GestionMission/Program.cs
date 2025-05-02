using GestionMission.Data;
using GestionMission.Interfaces;
using GestionMission.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Ajouter CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // URL de ton app Angular
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Optionnel si tu utilises l'authentification avec cookies ou tokens
    });
});

// Ajouter les services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection"))
);

// Injection des services métiers
builder.Services.AddScoped<IAffectationService, AffectationService>();
builder.Services.AddScoped<IFonctionService, FonctionService>();
builder.Services.AddScoped<IEmployerService, EmployerService>();
builder.Services.AddScoped<IStatutService, StatutService>();
builder.Services.AddScoped<IVehiculeService, VehiculeService>();
builder.Services.AddScoped<ICongeService, CongeService>();
builder.Services.AddScoped<IMissionService, MissionService>();
builder.Services.AddScoped<ITeamService, TeamService>();
builder.Services.AddScoped<IPaimentService, PaimentService>();

var app = builder.Build();

// Pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Rediriger HTTP vers HTTPS (doit être avant CORS)
app.UseHttpsRedirection();

// Activer CORS avant l'authentification/autorisation
app.UseCors("AllowAngularApp");

// Middleware d'authentification (si tu ajoutes plus tard l'auth)
app.UseAuthorization();

// Routing
app.MapControllers();

// Démarrer l'application
app.Run();
