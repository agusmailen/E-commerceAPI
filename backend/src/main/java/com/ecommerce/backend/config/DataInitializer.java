package com.ecommerce.backend.config;

import com.ecommerce.backend.entity.Categoria;
import com.ecommerce.backend.entity.Producto;
import com.ecommerce.backend.entity.Usuario;
import com.ecommerce.backend.repository.CategoriaRepository;
import com.ecommerce.backend.repository.ProductoRepository;
import com.ecommerce.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya hay datos
        if (usuarioRepository.count() > 0) {
            return; // Ya hay datos, no inicializar
        }

        // Crear usuarios
        crearUsuarios();
        
        // Crear categorías
        crearCategorias();
        
        // Crear productos
        crearProductos();
    }
    
    private void crearCategorias() {
        Categoria tecnologia = new Categoria();
        tecnologia.setNombre("Tecnología");
        tecnologia.setDescripcion("Productos tecnológicos y electrónicos de última generación");
        tecnologia.setImagenUrl("https://picsum.photos/id/180/400/300");
        tecnologia.setEstado(Categoria.Estado.ACTIVA);
        
        Categoria deportes = new Categoria();
        deportes.setNombre("Deportes");
        deportes.setDescripcion("Artículos deportivos y equipamiento para todo tipo de deportes");
        deportes.setImagenUrl("https://picsum.photos/id/403/400/300");
        deportes.setEstado(Categoria.Estado.ACTIVA);
        
        Categoria fotografia = new Categoria();
        fotografia.setNombre("Fotografía");
        fotografia.setDescripcion("Equipos y accesorios para fotografía profesional y amateur");
        fotografia.setImagenUrl("https://picsum.photos/id/250/400/300");
        fotografia.setEstado(Categoria.Estado.ACTIVA);
        
        Categoria accesorios = new Categoria();
        accesorios.setNombre("Accesorios");
        accesorios.setDescripcion("Accesorios diversos para complementar tu estilo de vida");
        accesorios.setImagenUrl("https://picsum.photos/id/225/400/300");
        accesorios.setEstado(Categoria.Estado.ACTIVA);
        
        categoriaRepository.saveAll(Arrays.asList(tecnologia, deportes, fotografia, accesorios));
    }

    private void crearUsuarios() {
        Usuario admin = new Usuario();
        admin.setEmail("admin@shophub.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setNombre("Administrador");
        admin.setFirstName("Admin");
        admin.setLastName("Sistema");
    admin.setUser("admin");
        admin.setRol(Usuario.Rol.ADMIN);

        Usuario usuario = new Usuario();
        usuario.setEmail("usuario@shophub.com");
        usuario.setPassword(passwordEncoder.encode("usuario123"));
        usuario.setNombre("Usuario Demo");
        usuario.setFirstName("Usuario");
        usuario.setLastName("Demo");
    usuario.setUser("usuario");
        usuario.setRol(Usuario.Rol.CLIENTE);

        Usuario juan = new Usuario();
        juan.setEmail("juan@shophub.com");
        juan.setPassword(passwordEncoder.encode("juan123"));
        juan.setNombre("Juan Pérez");
        juan.setFirstName("Juan");
        juan.setLastName("Pérez");
    juan.setUser("juan");
        juan.setRol(Usuario.Rol.CLIENTE);

        Usuario maria = new Usuario();
        maria.setEmail("maria@shophub.com");
        maria.setPassword(passwordEncoder.encode("maria123"));
        maria.setNombre("María García");
        maria.setFirstName("María");
        maria.setLastName("García");
    maria.setUser("maria");
        maria.setRol(Usuario.Rol.CLIENTE);

        usuarioRepository.saveAll(Arrays.asList(admin, usuario, juan, maria));
    }

    private void crearProductos() {
        // Obtener las categorías creadas
        Categoria tecnologia = categoriaRepository.findByNombre("Tecnología").orElseThrow();
        Categoria deportes = categoriaRepository.findByNombre("Deportes").orElseThrow();
        Categoria fotografia = categoriaRepository.findByNombre("Fotografía").orElseThrow();
        Categoria accesorios = categoriaRepository.findByNombre("Accesorios").orElseThrow();
        
        // Producto 1
        Producto camara = new Producto();
        camara.setNombre("Cámara Canon EOS R5");
        camara.setDescripcion("Cámara mirrorless profesional con sensor full-frame de 45MP");
        camara.setPrecio(BigDecimal.valueOf(3899.99));
        camara.setImagen("https://picsum.photos/id/250/800/600");
        camara.setCategoria(fotografia);
        camara.setStock(0);
        camara.setEstado(Producto.Estado.AGOTADO);

        // Producto 2
        Producto guantes = new Producto();
        guantes.setNombre("Guantes de Boxeo Pro");
        guantes.setDescripcion("Guantes profesionales de boxeo con protección extra");
        guantes.setPrecio(BigDecimal.valueOf(89.99));
        guantes.setImagen("https://picsum.photos/id/345/800/600");
        guantes.setCategoria(deportes);
        guantes.setStock(0);
        guantes.setEstado(Producto.Estado.AGOTADO);
        guantes.setImagenes(Arrays.asList(
            "https://picsum.photos/id/345/800/600",
            "https://picsum.photos/id/346/800/600",
            "https://picsum.photos/id/347/800/600"
        ));
        Map<String, String> detallesGuantes = new HashMap<>();
        detallesGuantes.put("peso", "14 oz");
        detallesGuantes.put("material", "Cuero genuino");
        detallesGuantes.put("color", "Rojo/Negro");
        detallesGuantes.put("cierre", "Velcro ajustable");
        guantes.setDetalles(detallesGuantes);

        // Producto 3
        Producto smartwatch = new Producto();
        smartwatch.setNombre("Smartwatch Galaxy Watch 5");
        smartwatch.setDescripcion("Reloj inteligente con monitoreo avanzado de salud");
        smartwatch.setPrecio(BigDecimal.valueOf(299.99));
        smartwatch.setImagen("https://picsum.photos/id/160/800/600");
        smartwatch.setCategoria(tecnologia);
        smartwatch.setStock(0);
        smartwatch.setEstado(Producto.Estado.AGOTADO);
        smartwatch.setImagenes(Arrays.asList(
            "https://picsum.photos/id/160/800/600",
            "https://picsum.photos/id/161/800/600",
            "https://picsum.photos/id/162/800/600"
        ));
        Map<String, String> detallesWatch = new HashMap<>();
        detallesWatch.put("pantalla", "1.4 pulgadas AMOLED");
        detallesWatch.put("bateria", "361mAh");
        detallesWatch.put("resistencia", "IP68");
        detallesWatch.put("sensores", "ECG, Presión arterial, SpO2");
        smartwatch.setDetalles(detallesWatch);

        // Producto 4
        Producto zapatillas = new Producto();
        zapatillas.setNombre("Zapatillas Running Pro");
        zapatillas.setDescripcion("Zapatillas profesionales para running con máxima amortiguación");
        zapatillas.setPrecio(BigDecimal.valueOf(129.99));
        zapatillas.setImagen("https://picsum.photos/id/400/800/600");
        zapatillas.setCategoria(deportes);
        zapatillas.setStock(25);
        zapatillas.setEstado(Producto.Estado.ACTIVO);

        // Producto 5
        Producto laptop = new Producto();
        laptop.setNombre("Laptop Gaming ROG");
        laptop.setDescripcion("Laptop gaming con RTX 4060 y procesador Intel i9");
        laptop.setPrecio(BigDecimal.valueOf(1999.99));
        laptop.setImagen("https://picsum.photos/id/201/800/600");
        laptop.setCategoria(tecnologia);
        laptop.setStock(12);
        laptop.setEstado(Producto.Estado.ACTIVO);
        laptop.setImagenes(Arrays.asList(
            "https://picsum.photos/id/201/800/600",
            "https://picsum.photos/id/202/800/600",
            "https://picsum.photos/id/203/800/600"
        ));
        Map<String, String> detallesLaptop = new HashMap<>();
        detallesLaptop.put("procesador", "Intel i9 13900H");
        detallesLaptop.put("gpu", "RTX 4060 8GB");
        detallesLaptop.put("ram", "32GB DDR5");
        detallesLaptop.put("almacenamiento", "1TB NVMe SSD");
        laptop.setDetalles(detallesLaptop);

        // Producto 6
        Producto raqueta = new Producto();
        raqueta.setNombre("Raqueta de Tenis Pro");
        raqueta.setDescripcion("Raqueta profesional de tenis con marco de grafito");
        raqueta.setPrecio(BigDecimal.valueOf(199.99));
        raqueta.setImagen("https://picsum.photos/id/450/800/600");
        raqueta.setCategoria(deportes);
        raqueta.setStock(18);
        raqueta.setEstado(Producto.Estado.ACTIVO);
        raqueta.setImagenes(Arrays.asList(
            "https://picsum.photos/id/450/800/600",
            "https://picsum.photos/id/451/800/600",
            "https://picsum.photos/id/452/800/600"
        ));
        Map<String, String> detallesRaqueta = new HashMap<>();
        detallesRaqueta.put("peso", "300g");
        detallesRaqueta.put("tamaño", "27 pulgadas");
        detallesRaqueta.put("material", "Grafito");
        detallesRaqueta.put("tension", "50-60 libras");
        raqueta.setDetalles(detallesRaqueta);

        // Producto 7
        Producto drone = new Producto();
        drone.setNombre("Drone DJI Air 2S");
        drone.setDescripcion("Drone con cámara 4K y sensor de 1 pulgada");
        drone.setPrecio(BigDecimal.valueOf(999.99));
        drone.setImagen("https://picsum.photos/id/300/800/600");
        drone.setCategoria(fotografia);
        drone.setStock(10);
        drone.setEstado(Producto.Estado.ACTIVO);
        drone.setImagenes(Arrays.asList(
            "https://picsum.photos/id/300/800/600",
            "https://picsum.photos/id/301/800/600",
            "https://picsum.photos/id/302/800/600"
        ));
        Map<String, String> detallesDrone = new HashMap<>();
        detallesDrone.put("camara", "20MP 4K/60fps");
        detallesDrone.put("autonomia", "31 minutos");
        detallesDrone.put("alcance", "12km");
        detallesDrone.put("peso", "595g");
        drone.setDetalles(detallesDrone);

        // Producto 8
        Producto bicicleta = new Producto();
        bicicleta.setNombre("Bicicleta Mountain Bike");
        bicicleta.setDescripcion("Bicicleta de montaña con cuadro de aluminio y 21 velocidades");
        bicicleta.setPrecio(BigDecimal.valueOf(799.99));
        bicicleta.setImagen("https://picsum.photos/id/146/800/600");
        bicicleta.setCategoria(deportes);
        bicicleta.setStock(8);
        bicicleta.setEstado(Producto.Estado.ACTIVO);
        bicicleta.setImagenes(Arrays.asList(
            "https://picsum.photos/id/146/800/600",
            "https://picsum.photos/id/147/800/600",
            "https://picsum.photos/id/148/800/600"
        ));
        Map<String, String> detallesBici = new HashMap<>();
        detallesBici.put("marco", "Aluminio 6061");
        detallesBici.put("velocidades", "21");
        detallesBici.put("frenos", "Disco hidráulico");
        detallesBici.put("suspension", "Delantera 120mm");
        bicicleta.setDetalles(detallesBici);

        // Producto 9
        Producto auriculares = new Producto();
        auriculares.setNombre("Auriculares Sony WH-1000XM5");
        auriculares.setDescripcion("Auriculares premium con cancelación de ruido");
        auriculares.setPrecio(BigDecimal.valueOf(399.99));
        auriculares.setImagen("https://picsum.photos/id/325/800/600");
        auriculares.setCategoria(tecnologia);
        auriculares.setStock(22);
        auriculares.setEstado(Producto.Estado.ACTIVO);
        auriculares.setImagenes(Arrays.asList(
            "https://picsum.photos/id/325/800/600",
            "https://picsum.photos/id/326/800/600",
            "https://picsum.photos/id/327/800/600"
        ));
        Map<String, String> detallesAuri = new HashMap<>();
        detallesAuri.put("bateria", "30 horas");
        detallesAuri.put("conectividad", "Bluetooth 5.2");
        detallesAuri.put("audio", "LDAC, DSEE Extreme");
        detallesAuri.put("color", "Negro");
        auriculares.setDetalles(detallesAuri);

        // Producto 10
        Producto mochila = new Producto();
        mochila.setNombre("Mochila Fotográfica Pro");
        mochila.setDescripcion("Mochila profesional para equipo fotográfico");
        mochila.setPrecio(BigDecimal.valueOf(149.99));
        mochila.setImagen("https://picsum.photos/id/250/800/600");
        mochila.setCategoria(fotografia);
        mochila.setStock(15);
        mochila.setEstado(Producto.Estado.ACTIVO);
        mochila.setImagenes(Arrays.asList(
            "https://picsum.photos/id/250/800/600",
            "https://picsum.photos/id/251/800/600",
            "https://picsum.photos/id/252/800/600"
        ));
        Map<String, String> detallesMochila = new HashMap<>();
        detallesMochila.put("capacidad", "25L");
        detallesMochila.put("material", "Nylon balístico");
        detallesMochila.put("compartimentos", "Múltiples divisores");
        detallesMochila.put("resistencia", "Impermeable");
        mochila.setDetalles(detallesMochila);

        // Producto 11
        Producto pelota = new Producto();
        pelota.setNombre("Pelota de Fútbol Profesional");
        pelota.setDescripcion("Pelota de fútbol oficial con tecnología aerodinámica");
        pelota.setPrecio(BigDecimal.valueOf(49.99));
        pelota.setImagen("https://picsum.photos/id/358/800/600");
        pelota.setCategoria(deportes);
        pelota.setStock(40);
        pelota.setEstado(Producto.Estado.ACTIVO);
        pelota.setImagenes(Arrays.asList(
            "https://picsum.photos/id/358/800/600",
            "https://picsum.photos/id/359/800/600",
            "https://picsum.photos/id/360/800/600"
        ));
        Map<String, String> detallesPelota = new HashMap<>();
        detallesPelota.put("tamaño", "5");
        detallesPelota.put("material", "Cuero sintético");
        detallesPelota.put("tecnologia", "Aerodinámico");
        detallesPelota.put("certificacion", "FIFA Quality Pro");
        pelota.setDetalles(detallesPelota);

        // Producto 12
        Producto termo = new Producto();
        termo.setNombre("Termo Stanley Classic");
        termo.setDescripcion("Termo de acero inoxidable con aislamiento al vacío");
        termo.setPrecio(BigDecimal.valueOf(44.99));
        termo.setImagen("https://picsum.photos/id/225/800/600");
        termo.setCategoria(accesorios);
        termo.setStock(35);
        termo.setEstado(Producto.Estado.ACTIVO);
        termo.setImagenes(Arrays.asList(
            "https://picsum.photos/id/225/800/600",
            "https://picsum.photos/id/226/800/600",
            "https://picsum.photos/id/227/800/600"
        ));
        Map<String, String> detallesTermo = new HashMap<>();
        detallesTermo.put("capacidad", "1L");
        detallesTermo.put("material", "Acero inoxidable 18/8");
        detallesTermo.put("aislamiento", "24 horas frío/caliente");
        detallesTermo.put("color", "Verde militar");
        termo.setDetalles(detallesTermo);

        productoRepository.saveAll(Arrays.asList(
            camara, guantes, smartwatch, zapatillas, laptop, raqueta,
            drone, bicicleta, auriculares, mochila, pelota, termo
        ));
    }
}
