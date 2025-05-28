import { useState, useRef, useEffect } from 'react';
import { Mail, Linkedin, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { StarBackground } from './StarBackground';

const SERVICE_ID = 'service_w6k81z8';
const TEMPLATE_ID = 'template_2l2044a';
const PUBLIC_KEY = 'uaNhpeAGwaNsnaG9n';

export const ContactSection = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        emailjs.init(PUBLIC_KEY);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Sending message...' });

        try {
            console.log('Form Data:', formData);
            console.log('Form Element:', form.current);

            const result = await emailjs.sendForm(
                SERVICE_ID,
                TEMPLATE_ID,
                form.current
            );

            console.log('Email sent successfully:', result);
            
            if (result.status === 200) {
                setStatus({
                    type: 'success',
                    message: 'Message sent successfully! I will get back to you soon.'
                });
                setFormData({ from_name: '', from_email: '', message: '' });
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            console.error('Detailed error:', error);
            setStatus({
                type: 'error',
                message: error.text || 'Failed to send message. Please try again later.'
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section id="contact" className="py-24 px-4 relative bg-background overflow-hidden">
            <StarBackground />
            <div className="container mx-auto max-w-6xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Get in <span className="text-primary">Touch</span>
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
                </p>

                <div className="max-w-2xl mx-auto backdrop-blur-sm bg-background/80 p-8 rounded-lg shadow-lg">
                    <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                        {status.message && (
                            <div 
                                className={`p-4 rounded-lg text-center ${
                                    status.type === 'success' ? 'bg-green-100 text-green-700' :
                                    status.type === 'error' ? 'bg-red-100 text-red-700' :
                                    'bg-blue-100 text-blue-700'
                                }`}
                            >
                                {status.message}
                            </div>
                        )}

                        <div>
                            <label htmlFor="from_name" className="block text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="from_name"
                                name="from_name"
                                value={formData.from_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="from_email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="from_email"
                                name="from_email"
                                value={formData.from_email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status.type === 'loading'}
                            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                    <a 
                        href="mailto:Ayush.thite1999@gmail.com"
                        className="p-4 group hover:bg-card/50 rounded-lg transition-all duration-300 backdrop-blur-sm"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold">Email</h3>
                            <p className="text-muted-foreground">Ayush.thite1999@gmail.com</p>
                        </div>
                    </a>
                    <div className="p-4 group hover:bg-card/50 rounded-lg transition-all duration-300 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-2">
                            <MapPin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold">Location</h3>
                            <p className="text-muted-foreground">Bilaspur, Chhattisgarh, India</p>
                        </div>
                    </div>
                    <a 
                        href="https://www.linkedin.com/in/ayushthite" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-4 group hover:bg-card/50 rounded-lg transition-all duration-300 backdrop-blur-sm"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <Linkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold">LinkedIn</h3>
                            <p className="text-muted-foreground">www.linkedin.com/in/ayushthite</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}; 