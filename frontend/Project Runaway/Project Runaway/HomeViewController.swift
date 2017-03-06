//
//  ViewController.swift
//  Project Runaway
//
//  Created by Josh Gonzales-Neal on 2/24/17.
//  Copyright © 2017 se329. All rights reserved.
//

import UIKit
import MapKit

// MARK: -
// TODO: -
// FIXME: -

class HomeViewController: UIViewController {

    @IBOutlet weak var MapView: MKMapView!
    
    let regionRadius: CLLocationDistance = 1000
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        let initialLocation = CLLocation(latitude: 42.030781, longitude: -93.631913)
        
        centerMapOnLocation(location: initialLocation)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func centerMapOnLocation(location: CLLocation) {
        let coordinateRegion = MKCoordinateRegionMakeWithDistance(location.coordinate, regionRadius * 2.0, regionRadius * 2.0)
        MapView.setRegion(coordinateRegion, animated: true)
    }


}

