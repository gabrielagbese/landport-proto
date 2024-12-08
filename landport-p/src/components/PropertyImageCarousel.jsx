import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";

const PropertyImageCarousel = ({ images }) => {
    const isFile = (item) => item instanceof File;

    return (
        <Carousel className="relative">
            <CarouselContent>
                {Array.from(images).map((image, idx) => (
                    <CarouselItem key={idx} className="flex justify-center items-center">
                        <div className="w-full h-64 overflow-hidden">
                            <img
                                src={isFile(image) ? URL.createObjectURL(image) : image}
                                alt={`Property Image ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white" />
        </Carousel>
    );
};

export default PropertyImageCarousel;